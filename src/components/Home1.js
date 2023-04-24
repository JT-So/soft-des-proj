import "./HomeStyles.css";
import Pasig from "../assets/3.png";
const Home1 = () => {
  return (
    <div className="Home1">
      <h1> Welcome to Enviro Solutions </h1>
      <p>
        {" "}
        The ultimate destination for individuals seeking to make a positive
        impact on the environment. Our platform provides a space for users to
        share their environmental concerns and receive support and solutions
        from the Barangay Officials in the community. Our goal is to create a
        community of environmentally conscious individuals working together
        towards a sustainable future. Join us on our mission to protect our
        planet and make a difference in your community today.{" "}
      </p>

      <div className="Pasig">
        <div className="pas-text">
          <h2> Manggahan, Pasig </h2>
          <p>
            {" "}
            Barangay Manggahan is a residential area located in the city of
            Pasig, Philippines. The barangay is known for its efforts in
            maintaining a clean and green environment. It has several programs
            and initiatives aimed at promoting sustainable practices and
            preserving the natural resources within the community. While
            Barangay Manggahan Pasig has implemented several environmental
            programs and initiatives to promote sustainability, there are still
            some notable environmental problems in the area that need to be
            addressed. Some of these problems include:{" "}
          </p>
          <p>
            {" "}
            1. Solid waste management: Despite the "Basura Mo, I-Uwi Mo"
            campaign and the MRF, proper solid waste management remains a
            challenge in the barangay. There are still instances of improper
            waste disposal, and the barangay needs to address this issue to
            prevent the accumulation of waste in public areas and waterways.{" "}
          </p>
          <p>
            {" "}
            2. Air pollution: The barangay is located in a heavily urbanized
            area, and air pollution is a major concern. The high volume of
            vehicular traffic, as well as the presence of industrial facilities,
            contribute to poor air quality. This can lead to respiratory
            problems and other health issues among residents.{" "}
          </p>
          <p>
            {" "}
            3. Water pollution: There are several waterways within Barangay
            Manggahan Pasig, including the Pasig River and the Marikina River.
            However, these waterways are often polluted with solid waste and
            chemicals from nearby industries. This can have a negative impact on
            aquatic life and the health of residents who rely on these waterways
            for fishing or other livelihood activities.
          </p>
          <p>
            {" "}
            Overall, while Barangay Manggahan Pasig has made strides towards
            environmental sustainability, there are still several challenges
            that need to be addressed to ensure a cleaner and healthier
            environment for its residents.{" "}
          </p>
          <div className="image">
            <img alt="img" src={Pasig} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home1;
