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
      <h1>Render props presentation</h1>
      <Link href="/">
        <button>Home</button>
      </Link>
      <h5>examples:</h5>
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

        h1 {
          color: "white";
        }
      `}</style>
    </div>
  );
}

export default Header;
