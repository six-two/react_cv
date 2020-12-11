import React from 'react';
import {
    VictoryBar, VictoryChart, VictoryTooltip,
    VictoryAxis, VictoryVoronoiContainer, VictoryVoronoi
} from 'victory';


// const date = (y: number) => {
//   const d = new Date();
//   d.setUTCFullYear(y);
//   return d.getTime();
// }
const date = (y: number) => y;

const EDU = 1;
const JOB = 2;
const entries = [
    {
        label: "Uni",
        start: date(2016),
        end: date(2019),
        type: EDU,
    },
    {
        label: "NZ",
        start: date(2020),
        end: date(2021),
        type: EDU,
    },
    {
        label: "Fraunhofer",
        start: date(2017),
        end: date(2018),
        type: JOB,
    },
]

const sampleData = entries.map(e => {
    return {
        x: e.type,
        y0: e.start,
        y: e.end,
        label: e.label,
    }
});

const voronoiData = entries.map(e => {
    return {
        x: e.type,
        y: e.start + e.end / 2,
    }
});

const SHOW_VORONOI = false;

export default function GraphExperiment() {
    return <div>
        <VictoryChart
            containerComponent={
                <VictoryVoronoiContainer
                    mouseFollowTooltips={true}
                    labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
                />
            }
            domain={{ y: [2016, 2021] }}
            horizontal={true}
            height={150}>
            <VictoryAxis tickValues={["Edu", "Work"]} />
            <VictoryAxis
                dependentAxis={true}
                tickFormat={(t) => `${t}`}
            />
            {SHOW_VORONOI && <VictoryVoronoi
                style={{ data: { stroke: "#c43a31", strokeWidth: 2 } }}
                data={voronoiData} />
            }
            <VictoryBar
                labelComponent={<VictoryTooltip />}
                style={{ data: { fill: "blue" } }}
                alignment="start"
                data={sampleData}
            />
        </VictoryChart>
    </div>
}
