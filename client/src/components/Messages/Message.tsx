interface prop{
  text:string;
  own:boolean
}

export default function Message(prop:prop): JSX.Element {
    return (
      <>
      <div className={prop.own ? "message own" : "message"} >
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <p className="messageText">{prop.text}</p>
        </div>
      </div>
      </>
    );
  }