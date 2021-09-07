import React from 'react'
import styles from './styles.css'
import Section from 'App/components/Section'
import MutationButton from 'App/components/MutationButton'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

@withRouter
export default class Terminate extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    environment: PropTypes.object
  }

  render() {
    const params = {
      appId: this.props.environment.appId,
      environmentName: this.props.environment.name
    }
    return (
      <div className={styles.container}>
        <Section title="Terminate environment" description="Permanently terminate this environment">
          <div>
            Permanently terminate <b>{this.props.environment.cleanName}</b>? This action cannot be
            undone
          </div>
          <br />
          <MutationButton
            mutation="terminateEnvironment"
            label="Terminate environment"
            message={
              <span>
                This will permanently terminate <b>{this.props.environment.cleanName}</b> and this
                action cannot be undone. Are you sure?
              </span>
            }
            title="Terminate environment"
            confirmText="Terminate"
            danger
            params={params}
            onSuccess={() =>
              this.props.history.replace(`/dashboard/apps/${this.props.environment.appId}`)
            }
          />
        </Section>
      </div>
    )
  }
}
