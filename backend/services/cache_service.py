from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
from typing import Optional, Any
import json
import logging

logger = logging.getLogger(__name__)

class CacheService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.cache
    
    async def get(self, cache_key: str) -> Optional[Any]:
        """Get cached data if it exists and hasn't expired"""
        try:
            cached_item = await self.collection.find_one({
                "cache_key": cache_key,
                "expires_at": {"$gt": datetime.utcnow()}
            })
            
            if cached_item:
                logger.info(f"Cache hit for key: {cache_key}")
                return cached_item["data"]
            else:
                logger.info(f"Cache miss for key: {cache_key}")
                return None
                
        except Exception as e:
            logger.error(f"Error getting cache for key {cache_key}: {str(e)}")
            return None
    
    async def set(self, cache_key: str, data: Any, ttl_hours: int = 24) -> bool:
        """Set cached data with TTL"""
        try:
            expires_at = datetime.utcnow() + timedelta(hours=ttl_hours)
            
            await self.collection.update_one(
                {"cache_key": cache_key},
                {
                    "$set": {
                        "cache_key": cache_key,
                        "data": data,
                        "expires_at": expires_at,
                        "created_at": datetime.utcnow()
                    }
                },
                upsert=True
            )
            
            logger.info(f"Cached data for key: {cache_key} (expires: {expires_at})")
            return True
            
        except Exception as e:
            logger.error(f"Error setting cache for key {cache_key}: {str(e)}")
            return False
    
    async def delete(self, cache_key: str) -> bool:
        """Delete cached data"""
        try:
            result = await self.collection.delete_one({"cache_key": cache_key})
            logger.info(f"Deleted cache for key: {cache_key}")
            return result.deleted_count > 0
            
        except Exception as e:
            logger.error(f"Error deleting cache for key {cache_key}: {str(e)}")
            return False
    
    async def clear_expired(self):
        """Clear all expired cache entries"""
        try:
            result = await self.collection.delete_many({
                "expires_at": {"$lt": datetime.utcnow()}
            })
            logger.info(f"Cleared {result.deleted_count} expired cache entries")
            return result.deleted_count
            
        except Exception as e:
            logger.error(f"Error clearing expired cache: {str(e)}")
            return 0