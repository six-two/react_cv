import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setData } from './redux/actions';
import { loadTimeline } from './data/Timeline';
import { loadLabels } from './data/Labels';


export interface Props {
    loaded: boolean,
    children: any,
}

const loadData = () => {
    try {
        setData({
            timeline: loadTimeline(),
            labels: loadLabels(),
        });
    } catch (e) {
        console.error("Failed to load data from json files:", e);
    }
};

const DataLoader = (props: Props) => {
    if (props.loaded) {
        return <>
            {props.children}
        </>
    } else {
        loadData();
        return <div>
            <div>Loading data...</div>
            <div>This should normally take less than a second</div>
            <div>So if you can read this, please check the console (F12) for errors</div>
        </div>
    }
};

const mapStateToProps = (state: ReduxState) => ({
    loaded: !!state.data,
});

export const ReduxComponent = connect(mapStateToProps)(DataLoader);
export default ReduxComponent;
