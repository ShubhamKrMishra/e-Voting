// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import eimage from '../../assets/evoting1.jpg'
import aicteLogo from '../../assets/aicteLogo.jpg'
import jharkhand from '../../assets/jharkhand.png'
import citLogo from '../../assets/citLogo.jpg'
import sbuLogo from '../../assets/sbuLogo.png'

// function GroupExample() {
//   return (
//     <CardGroup>
//       <Card className="m-2 z-1 absolute">
//         <Card.Img  src={eimage} className="h-40" />
//         <Card.Body>
//           <Card.Title>CIT Ranchi</Card.Title>
//           <Card.Text>
//             This is a wider card with supporting text below as a natural lead-in
//             to additional content. This content is a little bit longer.
//           </Card.Text>
//         </Card.Body>
//         {/* <Card.Footer>
//           <small className="text-muted">Last updated 3 mins ago</small>
//         </Card.Footer> */}
//       </Card>
//       <Card className="m-2">
//         <Card.Img variant="top" src={eimage} className="h-40" />
//         <Card.Body>
//           <Card.Title>CIT Ranchi</Card.Title>
//           <Card.Text>
//             This is a wider card with supporting text below as a natural lead-in
//             to additional content. This content is a little bit longer.
//           </Card.Text>
//         </Card.Body>
//         {/* <Card.Footer>
//           <small className="text-muted">Last updated 3 mins ago</small>
//         </Card.Footer> */}
//       </Card>
//       <Card className="m-2">
//         <Card.Img variant="top" src={eimage} className="h-40" />
//         <Card.Body>
//           <Card.Title>CIT Ranchi</Card.Title>
//           <Card.Text>
//             This is a wider card with supporting text below as a natural lead-in
//             to additional content. This content is a little bit longer.
//           </Card.Text>
//         </Card.Body>
//         {/* <Card.Footer>
//           <small className="text-muted">Last updated 3 mins ago</small>
//         </Card.Footer> */}
//       </Card>
//       <Card className="m-2">
//         <Card.Img variant="top" src={eimage} className="h-40" />
//         <Card.Body>
//           <Card.Title>CIT Ranchi</Card.Title>
//           <Card.Text>
//             This is a wider card with supporting text below as a natural lead-in
//             to additional content. This content is a little bit longer.
//           </Card.Text>
//         </Card.Body>
//         {/* <Card.Footer>
//           <small className="text-muted">Last updated 3 mins ago</small>
//         </Card.Footer> */}
//       </Card>
//     </CardGroup>
//   );
// }

// export default GroupExample;


import React from "react";
import evoting from '../../assets/evoting1.jpg';

function GroupExample() {
  return (
    // <p>Danish Ansari</p>
    <>
      <div class="flex px-10">
        <div class="w-100 h-100 bg-white-200">
          <img
            className="d-block w-80 h-80 resiged-cover rounded-lg"
            src={citLogo}
            alt="First slide"
          />
          <div class="w-100">
            <h1 class="text-xl">CIT</h1>
            <p class="w-80">Cambridge Institute of Technology was established in the year 2001 at Tatisilwai (16 kms from Ranchi, the capital of Jharkhand) as a preferred centre of scientific and technical education under the able and visionary guidance of Late Dr. Bahadur Singh- An Educationist & Social Reformer. The Institute has been promoted by Cambridge Trust of India, a registered body under Indian Trust Act. The Board of Governors of the trust comprises of Educationists, Technocrats, Social Workers and Philanthropists. Since its establishment, the Institute has grown and flourished rapidly and is today one of the premier Engineering Institutes of the country. The Institute is approved by All India Council for Technical Education (AICTE) New Delhi and affiliated to Ranchi University, Ranchi and Government of Jharkhand.
            </p>
          </div>
        </div>

        <div class="w-100 h-100 bg-white-200">
          <img
            className="d-block w-80 h-80 resiged-cover rounded-lg"
            src={sbuLogo}
            alt="First slide"
          />
          <div class="w-100">
            <h1 class="text-xl">SBU</h1>
            <p class="w-80">Sarala Birla University is a self-financed private unitary university. The Sarala Birla University Act. 2017 (Jharkhand Act. 13, 2017) has been passed by the Legislative Assembly of Jharkhand in 2017. The Sarala Birla University Act 2017 has been published in the Jharkhand Gazette on 4th July vide the Law Department Notification No. 504 dated 4th July 2017. As per the Act 2017 the Management of the university is carried out by a Board of Governors headed by Smt. Jayashree Mohta, Honorable Chairperson, Bharat Arogya & Gyan Mandir and the first Chancellor of Sarala Birla University.The SBU, Ranchi campus is situated amidst the verdant surroundings, stretching over nearly 60 acres of land owned by Bharat Arogya & Gyan Mandir at Birla Campus, Vill - Ara, P.O. – Mahilong, Ranchi-Purulia Highway, Ranchi, Jharkhand, India.
            </p>
          </div>
        </div>

        <div class="w-100 h-100 bg-white-200">
          <img
            className="d-block w-80 h-80 resiged-cover rounded-lg"
            src={aicteLogo}
            alt="First slide"
          />
          <div class="w-100">
            <h1 class="text-xl">AICTE</h1>
            <p class="w-80">The beginning of formal technical education in India can be dated back to the mid-19th century. Major policy initiatives in the pre-independence period included the appointment of the Indian Universities Commission in 1902, issue of the Indian Education Policy Resolution in 1904, and the Governor General’s policy statement of 1913 stressing the importance of technical education, the establishment of IISc in Bangalore, Institute for Sugar, Textile & Leather Technology in Kanpur, N.C.E. in Bengal in 1905, and industrial schools in several provinces.All India Council for Technical Education (AICTE) was set up in November 1945 as a national-level apex advisory body to conduct a survey on the facilities available for technical education and to promote development in the country in a coordinated and integrated manner. And to ensure the same, as stipulated in the National Policy of Education (1986), AICTE was vested with:
            </p>
          </div>
        </div>

        <div class="w-100 h-100 bg-white-200">
          <img
            className="d-block w-80 h-80 resiged-cover rounded-lg"
            src={jharkhand}
            alt="First slide"
          />
          <div class="w-100">
            <h1 class="text-xl">JUT</h1>
            <p class="w-80">Jharkhand University of Technology (JUT), Ranchi has been established by the Jharkhand University of Technology, ACT, 2011 (Jharkhand ACT 18, 2015), published vide gazette No.-815 date08/12/2015. JUT located at Science and Technology campus, Sirkhatoli, Namkum, Ranchi, Jharkhand- 834010. The whole of Jharkhand shall be the territorial jurisdiction under the JUT, Ranchi. JUT is intended to promote the creation of a centre of excellence in education and research in science, Technology, Engineering and Management, Town Planning, Pharmacy, Applied Arts and Crafts, Applied Science and such other programmes or areas as the central Government may in consultation with the All India Council for Technical Education by notification in the Gazette declare and need of Jharkhand.
            </p>
          </div>
        </div>

      </div>
    </>

  )
}

export default GroupExample;