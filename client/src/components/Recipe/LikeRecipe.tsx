import * as React from 'react';
import { Button } from '@material-ui/core';

import { withSession } from '../withSession';

import {
  LikeRecipeProps,
  LikeRecipeVariables
} from '../../interfaces/Recipe/likeRecipe.interface';

import { Mutation, MutationFn } from 'react-apollo';

import { LIKE_RECIPE } from '../../mutations';

class LikeRecipe extends React.Component<LikeRecipeProps, {}> {
  public state = {
    username: ''
  };

  public componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username } = this.props.session.getCurrentUser;
      this.setState({ username });
    }
  }

  public onLikeHandler = async (likeRecipe: MutationFn) => {
    const data = await likeRecipe();
    console.log(data);
  };

  public render() {
    const { username } = this.state;
    const { _id } = this.props;

    return (
      <>
        <Mutation<LikeRecipeVariables>
          mutation={LIKE_RECIPE}
          variables={{ _id, username }}
        >
          {likeRecipe =>
            username && (
              <Button onClick={() => this.onLikeHandler(likeRecipe)}>
                Like
              </Button>
            )
          }
        </Mutation>
      </>
    );
  }
}

export default withSession(LikeRecipe);
