import { Grid, Box } from '@material-ui/core';
import Head from 'next/head';
import SideMenu from '../../src/components/SideMenu';
import styles from '../../styles/Home.module.css';
import Menus from '../../src/containers/Menus';
import Layout from '../../src/components/Layout';

export default function Menu() {
  return (
    <Layout>
      <Menus />
    </Layout>
  )
}
