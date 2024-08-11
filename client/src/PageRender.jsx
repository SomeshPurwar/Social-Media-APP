// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import NotFound from './components/NotFound';

// const PageRender = () => {
//   const { page, id } = useParams();
//   const [PageComponent, setPageComponent] = useState(null);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const pageName = id ? `${page}/[id]` : page;

//     const loadComponent = async () => {
//       try {
//         const module = await import(`./pages/${pageName}`);
//         setPageComponent(() => module.default);
//       } catch (err) {
//         console.error(err);
//         setError(true);
//       }
//     };

//     loadComponent();
//   }, [page, id]);

//   if (error) {
//     return <NotFound />;
//   }

//   if (!PageComponent) {
//     return <div>Loading...</div>;
//   }

//   return <PageComponent />;
// };

// export default PageRender;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './components/NotFound';

const PageRender = () => {
  const { page, id } = useParams();
  const [PageComponent, setPageComponent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const pageName = id ? `${page}/[id]` : page;

    const loadComponent = async () => {
      try {
        // Use dynamic import
        const module = await import(/* @vite-ignore */`./pages/${pageName}`);
        setPageComponent(() => module.default);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    loadComponent();
  }, [page, id]);

  if (error) {
    return <NotFound />;
  }

  if (!PageComponent) {
    return <div>Loading...</div>;
  }

  return <PageComponent />;
};

export default PageRender;
