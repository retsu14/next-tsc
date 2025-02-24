import React from "react";

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
}

const Title: React.FC<TitleProps> = (props) => {
  return (
    <div className="text-2xl uppercase font-bold" {...props}>
      {props.title}
    </div>
  );
};

export default Title;
