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
    <div>
      <h1>Hello Header Component2</h1>
      <h5>examples:</h5>
      {exampleNumbers.map(number => (
        <Link href={`/example${number}`}>
          <button>Example {number}</button>
        </Link>
      ))}
    </div>
  );
}

export default Header;
