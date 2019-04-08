import React from 'react';
import CustomNavbar from "../../components/nav-bar/navbar";
import {getData} from "../../utils/storage";
import {Button, Card} from "react-bootstrap";
import { getReviewerProjectsAPI } from '../../utils/HTTP';

export default class ReviewerHome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        }
    }

    componentWillMount() {
        if (!getData('token')) {
            this.props.history.push("/login");
        }
    }

    async componentDidMount() {
        await this.fetchProjectList()
      }
    
    addProjects = (project) => {
        this.setState({
            projects: [...this.state.projects, project]
        });
    };
    
    fetchProjectList = async () => {
          const requestData = {
            // This needs to be changed when user data will come from backend
            name: localStorage.getItem('name')
          }
    
          try {
            const response = await getReviewerProjectsAPI(requestData);
            if (response.status === 200) {
              const projectList = response.data.pdetails;
              projectList.forEach((project) => {
                  this.addProjects(project);
              })
            }
          } catch (e) {
            console.log(e);
          }
      };

    readClicked = (id) => {
        // TODO this.state.selected hold the ID of the project, which we need to pass to API
        alert(`read clicked for id ${id}`);
    };

    render() {
        return (
            <>
                <CustomNavbar history={this.props.history} isReviewer={true}/>
                {
                    this.state.projects.map((item, index) => 
                        <li key={index} style={{listStyleType: 'none'}}>
                            <div className='container mt-5'>
                    <Card>
                        <Card.Body>
                            <Card.Title> {item.pname} </Card.Title> <span className='badge badge-warning'> Pending</span>
                        </Card.Body>
                        <Card.Footer>
                            <div className='text-right'>
                                <Button variant="primary" onClick={() => this.readClicked(item.pid)}>
                                    Read
                                </Button> &nbsp;
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
                        </li>
                    )
                }
            </>
        );
    }
}