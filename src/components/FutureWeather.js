import React from 'react';

const FutureWeather = ({ daily, toDayOfWeek }) => {
    return (
        <div className="future-weather text-xs bg-gray-700 px-6 py-8 overflow-hidden">
                {daily.map((day, index) =>
                    <div className={`flex items-center ${index > 0 ? 'mt-8' : ''}`} key={index}>
                        <div className="w-1/6 text-gray-200 text-lg">{toDayOfWeek(day.date_epoch)}</div>
                        <div className="w-4/6 px-4 flex items-center">
                                <img src={day.day.condition.icon} alt="" height="24" width="24" />
                                <div className="ml-3">{day.day.condition.text}</div>
                        </div>
                        <div className="w-1/4 text-right">
                            <div>{Math.round(day.day.maxtemp_f)}&deg;</div>
                            <div>{Math.round(day.day.mintemp_f)}&deg;</div>
                        </div>    
                </div>
            )}
        </div>
    )
    
}

export default FutureWeather;