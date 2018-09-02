import * as React from 'react';
import { Button } from '@material-ui/core';

import { withSession } from '../withSession';

import {
  LikeRecipeProps,
  LikeRecipeState,
  LikeRecipeVariables,
  UnLikeRecipeVariables
} from '../../interfaces/Recipe/likeRecipe.interface';

import { Mutation, MutationFn } from 'react-apollo';
import { InMemoryCache } from 'apollo-boost';

import { LIKE_RECIPE, UNLIKE_RECIPE } from '../../mutations';
import { getRecipe } from '../../queries';

class LikeRecipe extends React.Component<LikeRecipeProps, LikeRecipeState> {
  public state: LikeRecipeState = {
    username: '',
    liked: false
  };

  public componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        username,
        liked: prevLiked
      });
    }
  }

  public onClickHandler = (
    likeRecipe: MutationFn,
    unLikeRecipe: MutationFn
  ) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.onLikeHandler(likeRecipe, unLikeRecipe)
    );
  };

  public onLikeHandler = async (
    likeRecipe: MutationFn,
    unLikeRecipe: MutationFn
  ) => {
    if (this.state.liked) {
      await likeRecipe();
      await this.props.refetch();
    } else {
      await unLikeRecipe();
      await this.props.refetch();
    }
    // console.log(data.data);
  };

  public onUpdateLikeHandler = (
    cache: InMemoryCache,
    { data: { likeRecipe } }: any
  ) => {
    const { _id } = this.props;

    const { gR } = cache.readQuery({
      query: getRecipe,
      variables: { _id }
    });

    cache.writeQuery({
      query: getRecipe,
      variables: { _id },
      data: {
        gR: { ...gR, likes: likeRecipe.likes + 1 }
      }
    });
  };

  public onUpdateUnLikeHandler = (
    cache: InMemoryCache,
    { data: { unLikeRecipe } }: any
  ) => {
    const { _id } = this.props;

    const { gR } = cache.readQuery({
      query: getRecipe,
      variables: { _id }
    });

    cache.writeQuery({
      query: getRecipe,
      variables: { _id },
      data: {
        gR: { ...gR, likes: unLikeRecipe.likes - 1 }
      }
    });
  };

  public render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <>
        <Mutation<UnLikeRecipeVariables>
          mutation={UNLIKE_RECIPE}
          variables={{ _id, username }}
          update={this.onUpdateUnLikeHandler}
        >
          {unLikeRecipe => (
            <Mutation<LikeRecipeVariables>
              mutation={LIKE_RECIPE}
              variables={{ _id, username }}
              update={this.onUpdateLikeHandler}
            >
              {likeRecipe =>
                username && (
                  <Button
                    onClick={() =>
                      this.onClickHandler(likeRecipe, unLikeRecipe)
                    }
                  >
                    {liked ? 'Unlike' : 'Like'}
                  </Button>
                )
              }
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}

export default withSession(LikeRecipe);
