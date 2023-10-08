import { LoadMore } from './LoadMore.styled';

export const Button = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={() => onClick()}>
      Load more
    </LoadMore>
  );
};
