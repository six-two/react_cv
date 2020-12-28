import { connect } from 'react-redux';
import { ReduxState } from '../redux/store';
import { PersonalInfos } from '../data/Labels';
import PersonalInfo from '../PersonalInfo';


interface Props {
    infos?: PersonalInfos,
}

const PersonalInfoSection = (props: Props) => {
    if (props.infos) {
        return <div className="table">
            <PersonalInfo
                info={props.infos.name} />
            <PersonalInfo
                info={props.infos.email}
                is_email={true} />
            <PersonalInfo
                info={props.infos.location} />
            <PersonalInfo
                info={props.infos.nationality} />
            <PersonalInfo
                info={props.infos.gender} />
            <PersonalInfo
                info={props.infos.birthyear} />
            <PersonalInfo
                info={props.infos.cv}
                is_url={true} />
        </div>
    } else {
        return null;
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        infos: state.data?.labels.infos,
    }
};

export default connect(mapStateToProps)(PersonalInfoSection);
