// import { Link } from "react-router-dom";

// const AboutUser = ({ bio, social_links, joinedAt, className }) => {
//   return (
//     <div className={"md:w-[90%] md:mt-7" + className}>
//       <p className="text-xl leading-7">
//         {bio.length ? bio : "Nothing to read here"}
//       </p>

//       <div
//         className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey
//       "
//       >
//         {Object.keys(social_links).map((key) => {
//           let link = social_links[key];

//           return link ? <Link to={link}>{key}</Link> : "";
//         })}
//       </div>
//     </div>
//   );
// };
// export default AboutUser;

import { Link } from "react-router-dom";

const AboutUser = ({ bio, social_links = {}, joinedAt, className }) => {
  return (
    <div className={"md:w-[90%] md:mt-7 " + className}>
      <p className="text-xl leading-7">
        {bio?.length ? bio : "Nothing to read here"}
      </p>

      <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
        {social_links && Object.keys(social_links).length ? (
          Object.keys(social_links).map((key) => {
            let link = social_links[key];
            return link ? (
              <Link to={link} key={key}>
                {key}
              </Link>
            ) : null;
          })
        ) : (
          <p>No social links available</p>
        )}
      </div>
    </div>
  );
};

export default AboutUser;
