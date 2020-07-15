import React from 'react';
import { setTimelineEntries } from './redux/actions';
import { loadTimeline } from './data/Timeline';
import { loadLabels } from './data/Labels';
import SimpleTimeline from './SimpleTimeline';
import LanguageChooser from './LanguageChooser';
import LocalizedText from './LocalizedText';
import '../css/main.scss';
import {
  VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip, VictoryLine,
  VictoryAxis, VictoryVoronoiContainer, VictoryVoronoi
} from 'victory';

// --------------------------- TODOs -------------------------------
// add a takeaway field to everything
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();
setTimelineEntries(TIMELINE);
const LABELS = loadLabels();

class CustomTooltip extends React.Component {
  static defaultEvents = (VictoryTooltip as any).defaultEvents
  render() {
    const { x, y } = this.props as any;
    const rotation = `rotate(45 ${x} ${y})`
    return (
      <g transform={rotation}>
        <VictoryTooltip {...this.props} renderInPortal={false} />
      </g>
    );
  }
}

const EDU = 0;
const JOB = 1;
const entries = [
  {
    label: "Uni",
    start: 2016,
    end: 2019,
    type: EDU,
  },
  {
    label: "NZ",
    start: 2020,
    end: 2021,
    type: EDU,
  },
  {
    label: "Fraunhofer",
    start: 2017,
    end: 2018,
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
    y: (e.start + e.end) / 2,
  }
});

export default function App() {

  // const sampleData = [
  //   { x: 0, y: 1, y0: 0, label: "origin" },
  //   { x: 0, y: 4, y0: 2, label: "a" },
  //   { x: 1, y: 0.5, y0: 0.25, label: "a" },
  //   { x: 1, y: 1.5, y0: 2, label: "a" },
  //   { x: 1, y: 2.5, y0: 3, label: "a" },
  // ];
  const DEBUG_CHARTS = true;
  if (DEBUG_CHARTS) {
    return <div>
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            mouseFollowTooltips={true}
            labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
          />
        }
        domain={{ x: [0, 2], y: [2016, 2021] }}
        horizontal={true}
        height={150}>
        <VictoryVoronoi
          style={{ data: { stroke: "#c43a31", strokeWidth: 2 } }}
          data={voronoiData} />
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          style={{ data: { fill: "blue" } }}
          alignment="start"
          data={sampleData}
        />
      </VictoryChart>
    </div>
  }

  return < div className="app" >
    <div >
      <LanguageChooser />
    </div>

    <h1>
      <LocalizedText text={LABELS.headings.cv} />
    </h1>
    <div className="center">Name: Patrick Schlueter</div>

    <h2>
      <LocalizedText text={LABELS.headings.edu} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "edu")} />

    <h2>
      <LocalizedText text={LABELS.headings.jobs} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "job")} />

    <h2>
      <LocalizedText text={LABELS.headings.other} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "other")} />
  </div >
}
