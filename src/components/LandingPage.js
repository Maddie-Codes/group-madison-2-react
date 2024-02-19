import * as React from 'react';
import '../styles/LandingPage.css'

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            componentToShow: "landingPage"
        };

    }
    render() {
        return (
            <div className='landingPage-body'>
                <div>
                    <img src={require('../images/TC-logo.png')} alt="Task Crusher Logo" className='landingPage-image' />
                    <div className="bd-content ps-lg-4 d-flex flex-column flex-lg-row align-items-center justify-content-md-center gap-3 mb-4">
                        <div class="d-grid gap-2 d-md-block">
                            <a href='./api/register'>
                                <button class="btn btn-primary border-0 landingPage-btn" type="button">REGISTER</button>
                            </a>
                            <a href='./api/parentLogin'>
                                <button class="btn btn-primary border-0 landingPage-btn" type="button">PARENT LOGIN</button>
                            </a>
                            <a href='./api/kidLogin'>
                                <button class="btn btn-primary border-0 landingPage-btn" type="button">CHILD LOGIN</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

