import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello Next.js</p>
  </div>
);

function Header() {
  let exampleNumbers = [];

  for (var i = 1; i <= 5; i++) {
    exampleNumbers.push(i);
  }
  return (
    <div className="cont">
      <h1 className="header">Render props presentation1</h1>
      <Link href="/">
        <button>Home</button>
      </Link>
      <h5 className="header">examples:</h5>
      {exampleNumbers.map(number => (
        <Link href={`/example${number}`}>
          <button>Example {number}</button>
        </Link>
      ))}
      <style jsx>{`
        .cont {
          background: #292929;
          padding: 100px;
          text-align: center;
          transition: 100ms ease-in background;
        }

        .header {
          color: "#fff";
        }
      `}</style>
    </div>
  );
}

export default Header;
