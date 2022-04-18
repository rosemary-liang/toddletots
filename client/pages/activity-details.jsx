import React from 'react';

export default class ActivityDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: null
    };
  }

  // componentDidMount() {
  //   fetch(`api/activities/${this.props.activityId}`);
  //   .then(results => results)
  // }

  render() {
    // if (!this.state.activity) return null;
    return (
      <h1>Activity Details Test</h1>
    );

  }
}
