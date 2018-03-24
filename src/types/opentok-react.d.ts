
declare module 'opentok-react' {
  interface OTSubscriberProps {
    properties?: OT.SubscriberProperties
    session: OT.Session;
    stream: OT.Stream;
  }
  export class OTSession extends React.Component<OpenTokCredentials, any> {}
  export class OTPublisher extends React.Component<{session?: OT.Session}, any> {}
  export class OTSubscriber extends React.Component<OTSubscriberProps, any> {}
  export class OTStreams extends React.Component<{}, any> {}
  export interface SessionHelper {
    session: OT.Session
    disconnect: () => void;
  }

  interface CreateSessionParams extends OpenTokCredentials {
    onStreamsUpdated: (streams: OT.Stream[]) => void;
  }

  export function createSession(params: CreateSessionParams): SessionHelper;
}