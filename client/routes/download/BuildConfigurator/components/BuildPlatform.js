import React from 'react';
import { connect } from 'react-redux';
import Checkbox from '../../../../components/Checkbox';
import { togglePlatform } from '../actions';

import { NATIVE_WIN, NATIVE_LINUX, NATIVE_MAC } from '../constants';

import IconWindows from 'react-icons/fa/windows';
import IconLinux from 'react-icons/fa/linux';
import IconMacos from 'react-icons/fa/apple';

const getIcon = platform => {
  switch (platform) {
    case NATIVE_WIN:
      return <IconWindows />;
    case NATIVE_MAC:
      return <IconMacos />;
    case NATIVE_LINUX:
      return <IconLinux />;
    default:
      return null;
  }
};

@connect(
  state => {
    return {
      platforms: state.build.natives.allIds,
      natives: state.build.natives.byId,
      selected: state.build.platform,
      hide: state.build.mode !== 'zip',
    };
  },
  {
    togglePlatform,
  }
)
class BuildPlatform extends React.Component {
  toggle = platform => {
    this.props.togglePlatform(platform);
  };

  render() {
    const { hide, platforms, natives, selected } = this.props;

    return do {
      if (hide) {
        null;
      } else {
        <div>
          <h4 className="mt-3">Natives</h4>
          <div className="custom-controls-stacked">
            {platforms.map(platform => (
              <Checkbox
                key={platform}
                icon={getIcon(platform)}
                label={natives[platform].title}
                checked={selected[platform]}
                value={platform}
                onChange={this.toggle}
              />
            ))}
          </div>
        </div>;
      }
    };
  }
}

export default BuildPlatform;
