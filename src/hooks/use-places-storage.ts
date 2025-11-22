import { useEffect, useMemo, useState } from 'react'

import { destinations } from '@/data/destinations'

const STORAGE_KEY = 'favorite-places'

/**
 * use local storage to save places that user favorited
 */
export function usePlacesStorage() {
  const [storageData, setStorageData] = useState<string[]>([])

  useEffect(() => {
    function loadData() {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) setStorageData(JSON.parse(data))
    }
    loadData()
  }, [])

  const placesData = useMemo(() => {
    if (!storageData || storageData.length === 0) return []

    return destinations.filter(destination =>
      storageData.includes(destination.id),
    )
  }, [storageData])

  function savePlace(placeId: string) {
    const updatedData = [...storageData, placeId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
    setStorageData(updatedData)
  }

  function removePlace(placeId: string) {
    const updatedData = storageData.filter((id: string) => id !== placeId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData))
    setStorageData(updatedData)
  }

  function isPlaceSaved(placeId: string) {
    return storageData.includes(placeId)
  }

  return { savePlace, removePlace, isPlaceSaved, placesData }
}
