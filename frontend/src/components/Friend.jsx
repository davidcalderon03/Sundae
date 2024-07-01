import '../css/Friend.css';

function Friend(props) {
  return (
    <div className="Friend">
      <input type="checkbox" id="todo1" />
      <label htmlFor="todo1">{props.text}</label>
    </div>
  );
}

export default Friend;
