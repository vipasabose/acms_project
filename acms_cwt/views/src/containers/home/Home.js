import React from "react";
import CustomNavbar from "../../components/nav-bar/navbar";
import { getData } from "../../utils/storage";
import ProjectCard from "../../components/project-card/projectcard";
import { getProjectsAPI } from "../../utils/HTTP";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: []
    };
  }

  componentWillMount() {
    if (!getData("token")) {
      this.props.history.push("/login");
    }
  }

  addProjects = project => {
    this.setState({
      projects: [...this.state.projects, project]
    });
  };

  async componentDidMount() {
    await this.fetchProjectList();
  }

  fetchProjectList = async () => {
    const requestData = {
      // This needs to be changed when user data will come from backend
      name: localStorage.getItem("name")
    };

    try {
      const response = await getProjectsAPI(requestData);
      if (response.status === 200) {
        const projectList = response.data.pdetails;
        projectList.forEach(project => {
          this.addProjects(project);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <>
        <CustomNavbar
          history={this.props.history}
          addProjects={this.addProjects}
        />
        {this.state.projects.map((item, index) => (
          <li key={index} style={{ listStyleType: "none" }}>
            {<ProjectCard title={item.pname} version={item.pver + 1 || 0} />}
          </li>
        ))}
      </>
    );
  }

  componentWillUnmount() {
    this.setState({
      projects: []
    });
  }
}
