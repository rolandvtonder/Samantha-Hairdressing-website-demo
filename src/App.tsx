import type {ComponentType} from 'react';
import {Layout} from './components/Layout';
import {About} from './pages/About';
import {Contact} from './pages/Contact';
import {Gallery} from './pages/Gallery';
import {Home} from './pages/Home';
import {NotFound} from './pages/NotFound';
import {Services} from './pages/Services';
import {Specials} from './pages/Specials';
import {findRoute} from './seo';

const pages: Record<string, ComponentType> = {
  '/': Home,
  '/services/': Services,
  '/gallery/': Gallery,
  '/about/': About,
  '/specials-reviews/': Specials,
  '/contact/': Contact,
};

export default function App({path}: {path: string}) {
  const route = findRoute(path);
  const Page = pages[route.path] ?? NotFound;
  return (
    <Layout path={route.path}>
      <Page />
    </Layout>
  );
}
