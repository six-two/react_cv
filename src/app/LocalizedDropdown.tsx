import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LString, getLocalizedText } from "./LocalizedText";

function LocalizedDropdown(props: Props) {
  const onChange = (e: any) => props.onValueChange(e.target.value);
  const options = [...props.optionMap.entries()];

  return <div className="select-wrapper">
    <select className="button-style" value={props.value} onChange={onChange}>
      {options.map(([key, value]) =>
        <option key={key} value={key}>
          {getLocalizedText(value, props.lang)}
        </option>)
      }
    </select>
  </div>
}

interface Props {
  value: string,
  onValueChange: (value: string) => void,
  optionMap: Map<string, LString>,//keys -> labels
  lang: string,
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});

export default connect(mapStateToProps)(LocalizedDropdown);
