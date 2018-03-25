import * as React from 'react';
import '@opentok/client';
import { OTSession, OTPublisher, OTSubscriber, createSession, SessionHelper } from 'opentok-react';
import './App.css';
import layoutIcon from '../../images/layout.png';
import credentials from '../../credentials';

class App extends React.Component {

  sessionHelper: SessionHelper;
  subscriberProperties: OT.SubscriberProperties;
  state: { streams: OT.Stream[], layout: Layout };
  publisherCanvas: HTMLCanvasElement | null;
  layout: Layout;

  constructor(props: {} = {}) {
    super(props);
    this.state = { streams: [], layout: 'standard' };
    this.subscriberProperties = {
      preferredFrameRate: 15,
      showControls: false
    };
    this.updateLayout = this.updateLayout.bind(this);
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      ...credentials,
      onStreamsUpdated: (streams: OT.Stream[]) => { this.setState({ streams }); }
    });
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  updateLayout() {
    if (this.state.layout === 'standard') {
      this.setState({layout: 'stack'});
    } else  {
      this.setState({layout: 'standard'});
    }
  }

  render() {
    const { apiKey, sessionId, token } = credentials;
    return (
      <div className="App-container">
      <img className="App-layout-icon" src={layoutIcon} alt="layout" onClick={this.updateLayout} />
      <h1>OpenTok React</h1>
        <OTSession apiKey={apiKey} sessionId={sessionId} token={token} >
          <div className="App-publisher-container">
            <OTPublisher session={this.sessionHelper.session} />
          </div>
          <div className="App-subscribers-container">
            {this.state.streams.map((stream: OT.Stream) => {
              return (
                <OTSubscriber
                  key={stream.streamId}
                  session={this.sessionHelper.session}
                  stream={stream}
                />
              );
            })}
          </div>
        </OTSession>
      </div>
    );
  }
}

export default App;
