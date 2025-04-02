import React from "react";
import Aboutus from "./About-us";

const Home = () => {
  const serivceData = [
    {
      id: 1,
      image: "https://images.app.goo.gl/yctAKCJfUvmosRY38",
      title: "Cleaning",
      description:
        "Cleaning is the process of removing unwanted substances, dirt, grime, etc",
      "button-title": "Learn more",
    },
    {
      id: 2,
      image: "https://images.app.goo.gl/dcpsFYDgDwrEoQPMA",
      title: "house keeping",
      description:
        "Cleaning is the process of removing unwanted substances, dirt, grime, etc",
      "button-title": "Learn more",
    },
    {
      id: 3,
      image: "https://images.app.goo.gl/dcpsFYDgDwrEoQPMA",
      title: "Garden Maintenance",
      description:
        "Cleaning is the process of removing unwanted substances, dirt, grime, etc",
      "button-title": "Learn more",
    },
  ];
  console.log("service data", serivceData);

  return (
    <>
      <div>
        herosection, about content, our services, contact us form ,testimonials
        <div className="container">
          <div className="row">
            {serivceData &&
              serivceData.map((item) => {
                return (
                  <div className="col-md-4" key={item.id}>
                    <div className="service-box">
                      <img src={item.image} alt="service" />
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Aboutus />
    </>
  );
};

export default Home;
