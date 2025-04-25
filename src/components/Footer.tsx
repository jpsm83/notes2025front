import { Link } from "react-router-dom";

interface ISubObj {
  text: string;
  whereTo: string;
}

interface IFooterObj {
  main: string;
  sub: ISubObj[];
}

const footerObj = [
  {
    main: "About",
    sub: [
      { text: "Our history", whereTo: "" },
      { text: "Principles", whereTo: "" },
      { text: "Journey", whereTo: "" },
      { text: "What we stand for", whereTo: "" },
    ],
  },
  {
    main: "Contact",
    sub: [
      { text: "Address", whereTo: "" },
      { text: "Mail and social media", whereTo: "" },
      { text: "Around the globe", whereTo: "" },
      { text: "Our personals", whereTo: "" },
    ],
  },
  {
    main: "Hiring",
    sub: [
      { text: "Work with us", whereTo: "" },
      { text: "Jobs opening", whereTo: "" },
      { text: "Share your espertise", whereTo: "" },
      { text: "Refer a friend", whereTo: "" },
    ],
  },
  {
    main: "Support",
    sub: [
      { text: "I want know more", whereTo: "" },
      { text: "Get a quote", whereTo: "" },
      { text: "Sugerences", whereTo: "" },
      { text: "QA", whereTo: "" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="flex sticky botton-0 z-50 wrap w-full justify-evenly items-center bg-gray-200">
      {footerObj.map((item: IFooterObj, index: number) => (
        <div key={index} className="footTag sm:text-md">
          <h4 className="font-bold mb-4">{item.main}</h4>
          <ul>
            {item.sub.map((subItem: ISubObj, subIndex) => (
              <li key={subIndex}>
                <Link className="anchorLink" to={subItem.whereTo}>
                  {subItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
