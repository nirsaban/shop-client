import React ,{useState,useEffect}from 'react';
import AnimatedText from 'react-animated-text-content';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
  } from 'mdb-react-ui-kit';
  import httpRequest from '../../classes/httpRequest'
  import { useHistory } from 'react-router-dom';
  import apiRoutes from '../../config/routesApi.json'
const About = () => {
    const [state, setState] = useState({})
    const history = useHistory()
    useEffect(() => {
        
        (async () => {
            try {
                const response = await (new httpRequest(apiRoutes.about.GET_ABOUT)).get();
             
                console.log(response)
                if (response.status == 200) {
                    let {content,images} = response.data;
                
                    setState(p => ({
                        ...p, content,images }))
                } else {
                    
                }
            } catch {
                

            }

        })()
    }, [])


    return (
            <>
    <div id="caruselAbout">
    <MDBCarousel showIndicators showControls fade >
      <MDBCarouselInner>
      {
          state?.images?.map((image,index) => {
           return (
        <MDBCarouselItem className={index == 0 ? 'active' : ""}>
        <MDBCarouselCaption>
            <h5>מברוק עליכ</h5>
            <AnimatedText 
            type="words" // animate words or chars
            animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
            }}
            animationType="float"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
        >
        {state?.content}
        </AnimatedText>
          </MDBCarouselCaption>
          <MDBCarouselElement 
          className="d-block w-100 h-100 product-img pattern-2"
          src={`${image}`} alt='...'  />
          
        </MDBCarouselItem>
            )

          })
      }
        
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
        </>
    )
}



export default About

