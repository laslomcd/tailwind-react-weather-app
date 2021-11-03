import React from "react";


const CurrentWeather = ({ actual, feels, summary, name, region, icon }) => {
    return (
        <div className="current-weather flex items-center justify-between py-8 px-6">
            <div className="flex items-center">
                <div>
                    <div className="font-semibold text-6xl">{Math.round(actual)}&deg;</div>
                    <div className="text-sm">Feels Like {Math.round(feels)}&deg;</div>
                </div>
                <div className="mx-5">
                    <div className="font-semibold">{summary}</div>
                    <div>{name}, {region}</div>
                </div>
            </div>
            <div>
                <img src={icon} alt="" width="96" height="96" />
                {/* <canvas id="iconCurrent"  width="96" height="96"></canvas> */}
            </div>
        </div>
    )
}


export default CurrentWeather;