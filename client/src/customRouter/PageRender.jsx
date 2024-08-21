// import React, { Suspense, lazy, useEffect, useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import NotFound from '../components/NotFound';
// import { useSelector } from 'react-redux';

// const PageRender = () => {
//     const { page, id } = useParams();
//     const auth = useSelector(state => state.auth);
//     const location = useLocation();
//     const [PageComponent, setPageComponent] = useState(() => lazy(() => Promise.resolve({ default: NotFound })));

//     useEffect(() => {
//         const loadComponent = async () => {
//             if (auth.token) {
//                 try {
//                     const module = await import(/* @vite-ignore */`../pages/${id ? `${page}/[id]` : page}`);
//                     setPageComponent(() => lazy(() => Promise.resolve(module)));
//                 } catch (err) {
//                     setPageComponent(() => lazy(() => Promise.resolve({ default: NotFound })));
//                 }
//             } else {
//                 setPageComponent(() => lazy(() => Promise.resolve({ default: NotFound })));
//             }
//         };

//         loadComponent();
//     }, [page, id, auth.token, location.pathname]);

//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <PageComponent />
//         </Suspense>
//     );
// };

// export default PageRender;

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useSelector } from 'react-redux';

const PageRender = () => {
    const { page, id } = useParams();
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    const [PageComponent, setPageComponent] = useState(() => lazy(() => Promise.resolve({ default: NotFound })));

    useEffect(() => {
        const loadComponent = async () => {
            if (auth.token) {
                try {
                    // Determine the path based on the presence of `id`
                    const modulePath = id ? `../pages/${page}/[id]` : `../pages/${page}`;
                    const module = await import(`${modulePath}`);

                    if (module && module.default) {
                        setPageComponent(() => lazy(() => Promise.resolve(module)));
                    } else {
                        setPageComponent(() => lazy(() => Promise.resolve({ default: NotFound })));
                    }
                } catch (err) {
                    console.error('Failed to load page:', err);
                    setPageComponent(() => lazy(() => Promise.resolve({ default: NotFound })));
                }
            } else {
                setPageComponent(() => lazy(() => Promise.resolve({ default: NotFound })));
            }
        };

        loadComponent();
    }, [page, id, auth.token, location.pathname]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageComponent />
        </Suspense>
    );
};

export default PageRender;
