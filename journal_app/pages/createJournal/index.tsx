import React, { useState, useEffect } from "react";

interface Entries {
  title: string;
  description: string;
  publishDate: Date;
}
const NewEntry: React.FC = () => {
  const [entry, setEntry] = useState([]);
  useEffect(() => {
    await fetch("/api/index", {
        method:'POST'
    });
  }, []);

  return <div></div>;
};

export default NewEntry;
