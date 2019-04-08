import React from "react";
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default class ProjectCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      version: [],
      enableContribute: true,
      selected: null
    };

    this.loadData();
  }

  componentWillMount() {}

  loadData = () => {
    const versions = [...Array(this.props.version).keys()];
    versions.sort((a, b) => {
      return b - a;
    });
    versions.forEach((version, index) => {
      const isLatest = index === 0;
      this.setState({
        version: this.state.version.push({
          ver: version + 1,
          isLastest: isLatest
        })
      });
    });
  };

  selectedValue = item => {
    this.setState({
      enableContribute: !item.isLastest,
      selected: item.ver
    });
  };

  handleSelected = event => {
    this.setState({
      selected: event
    });
  };

  contributorClicked = () => {
    // TODO this.state.selected hold the ID of the version, which we need to pass to API
    if (!this.state.selected) {
      return;
    }
    alert(`contribute clicked for version ${this.state.selected}`);
  };

  readClicked = () => {
    // TODO this.state.selected hold the ID of the version, which we need to pass to API
    if (!this.state.selected) {
      return;
    }
    alert(`read clicked for version ${this.state.selected}`);
  };

  render() {
    return (
      <div className="container mt-5">
        <Card>
          <Card.Header>
            <Card.Title>{this.props.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <DropdownButton
              id="dropdown-basic-button"
              variant="outline-secondary"
              title={
                this.state.selected > 0
                  ? this.state.selected
                  : "Select a version"
              }
              onSelect={event => this.handleSelected(event)}
            >
              <Dropdown.Header>Select a version</Dropdown.Header>
              {this.state.version.map((item, index) => (
                <Dropdown.Item
                  key={index}
                  eventKey={item.ver}
                  onSelect={() => {
                    this.selectedValue(item);
                  }}
                >
                  {item.ver}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Card.Body>
          <Card.Footer>
            <div className="text-right">
              <Button variant="primary" onClick={this.readClicked}>
                Read
              </Button>{" "}
              &nbsp;
              <Button
                variant="secondary"
                disabled={this.state.enableContribute}
                onClick={this.contributorClicked}
              >
                Contribute
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
