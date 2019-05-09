import React, { PureComponent } from 'react'
import {Comment, Icon, Tooltip, Avatar} from 'antd'
import moment from 'moment'


export default class JeremySun extends PureComponent {

    state = {
        likes: 6527,
        dislikes: 121,
        action: null,
    }

    render () {
        const { likes, dislikes, action } = this.state
        const actions = [
            <span>
              <Tooltip title="Like">
                <Icon
                  type="like"
                  theme={action === 'liked' ? 'filled' : 'outlined'}
                  onClick={this.like}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                {likes}
              </span>
            </span>,
            <span>
              <Tooltip title="Dislike">
                <Icon
                  type="dislike"
                  theme={action === 'disliked' ? 'filled' : 'outlined'}
                  onClick={this.dislike}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                {dislikes}
              </span>
            </span>,
            <span>Reply to</span>
        ]
        return (
            <div style={{'display': 'flex', 'alignItems': 'center', 'height': '100%'}}>
                <Comment
                    actions={actions}
                    author={<a>JeremySun</a>}
                    avatar={(
                    <Avatar
                        src="https://avatars2.githubusercontent.com/u/33617990?s=400&u=43f0602acd6d0c98a66f07703623afb9f9df4b5b&v=4"
                        alt="JeremySun"
                    />
                    )}
                    content={(
                    <p>I am metamorphosis personified. I am a web developer who specializes in Front End, Mobile Development programming primarily with JavaScript in the Document Object Model and on the Server Side. And I am great in every way.</p>
                    )}
                    datetime={(
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>a Web Front-end developer</span>
                    </Tooltip>
                    )}
                />
            </div>
        )
    }
}