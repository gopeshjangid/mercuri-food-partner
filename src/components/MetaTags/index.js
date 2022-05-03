import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Tags = ({
  seo_description, seo_keywords, canonical_url, robots, title,
}) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={seo_description} />
    <meta name="keywords" content={seo_keywords} />
    <meta name="robots" content={robots} />
    <link rel="canonical" href={canonical_url} />
    </Head>
);

const MetaTags = ({ data }) => {
  let {
    seo_description, meta_description, seo_keywords, meta_keywords, seo_title, meta_title, title,
  } = data;
  let {
    canonical_url = '', robots = 'noindex, nofollow', searchable = '', follow, index = '',
  } = data;

  searchable = searchable || index;

  robots = RobotsCheck(searchable, follow);

  seo_description = checkVal(seo_description || meta_description);

  seo_keywords = checkVal(seo_keywords || meta_keywords);

  seo_title = `${checkVal(seo_title || meta_title)}`;

  title = title || seo_title;

  canonical_url = canonical_url.trim().split('?')[0];

  return Tags({
    seo_description, seo_keywords, seo_title, canonical_url, robots, title,
  });
};

const checkVal = (val) => (val && val !== 'null' ? val : '');

const RobotsCheck = (searchable, follow) => {
  if (searchable && follow) return 'index, follow';
  if (!searchable && follow) return 'noindex, follow';
  if (searchable && !follow) return 'index, nofollow';
  if (!searchable && !follow) return 'noindex, nofollow';
};

MetaTags.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MetaTags;
