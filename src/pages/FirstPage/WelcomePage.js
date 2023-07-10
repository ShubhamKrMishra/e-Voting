
import React from 'react'
import './WelcomePage.css'
import Carousel from 'react-bootstrap/Carousel';
import evoting from '../../assets/evoting1.jpg';
import voting from '../../assets/voting.jpg';
import peopleVote from '../../assets/peopleVote.jpeg';
import Vote from '../../assets/vote.png';
import voterChoice from '../../assets/voterChoice.jpg';
import GroupExample from './Cards';
import LinerProgress from './LinerProgress';
// import eimage from '../..'

const CarousalComp = () => {
    return (
        <div className='mb-10 z-1'>
            {/* <Carousel variant="dark">
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-80 resiged-cover"
                        src={evoting}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5 class='text-2xl'>First slide label</h5>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-80 resiged-cover"
                        src={evoting}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5 class='text-2xl'>Second slide label</h5>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-80 resiged-cover"
                        src={evoting}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5 class='text-2xl'>third slide label</h5>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            <img
                className="d-block w-100 h-80 resiged-cover"
                src={voting}
                alt="First slide"
            />
        </div>
    )
}


const About = () => {
    return (
        <div id="about">
            <p class="mb-20 ml-5 text-slate-500 text-2xl">About</p>
            <div class="flex justify-between px-10">
                <img src={evoting} alt="E-Voting" class="w-2/5 h-41 rounded-lg" />
                <div class="w-1/2">
                    <p>
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                    </p>
                </div>
            </div>
        </div>
    )
}


const Testimonial = () => {
    return (
        <div id="testimonial ">
            <p class="mt-40 ml-5 text-slate-500 text-xl mb-4">Testimonial</p>
            <GroupExample />
        </div>
    )
}

const Event = () => {
    return (
        <div id="event">
            <p class="mt-40">Event</p>
            <LinerProgress />
        </div>
    )
}

const OurClient = () => {
    return (
        <div id="ourclient">
            <p class="mt-40">OurClient</p>
        </div>
    )
}



const WelcomePage = () => {
    return (
        <div>
            <CarousalComp class="z-10" />
            <About />
            <Testimonial />
            <Event />
            <OurClient />
        </div>
    )
}
export default WelcomePage