import { useState } from 'react';

function Header() {
  const [headList, setHeadList] = useState([]);

  return (
    <div className="header">
      {
        headList.map((item) => <span key="item">{ item }</ span>)
      }
    </div>
    )
}

export default Header;