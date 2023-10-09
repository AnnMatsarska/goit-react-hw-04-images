import { LoadMore } from './LoadMore.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <LoadMore type="button" onClick={onLoadMore}>
      Load more
    </LoadMore>
  );
};
