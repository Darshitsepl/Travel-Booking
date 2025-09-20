import React from 'react'
import { Skeleton } from './ui/skeleton'

const SkelatonLoading = () => {
  return (
   <div className="p-6">
				<div className="space-y-6">
					<div className="flex justify-between items-center">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-10 w-28" />
					</div>
					<div className="bg-white rounded-lg border shadow-sm p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Skeleton className="h-16 w-full" />
							<Skeleton className="h-16 w-full" />
							<Skeleton className="h-16 w-full" />
						</div>
					</div>
				</div>
			</div>
  )
}

export default SkelatonLoading