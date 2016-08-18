import React from 'react';
import {
  MKColor,
  MKTextField,
  MKButton
} from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-material-design';

const styles = StyleSheet.create({
  title : {
    marginTop    : 4,
    marginBottom : -10,
    color        : '#000000',
    fontSize     : 18,
    fontWeight   : '300'
  },
  author : {
    color        : 'rgba(0, 0, 0, 0.54)',
    fontSize     : 11,
    fontWeight   : '400',
    marginTop    : 8,
    marginLeft   : -4,
    marginBottom : -5
  },
  actions : {
    borderTopColor : 'rgba(0, 0, 0, 0.1)',
    borderStyle    : 'solid',
    borderTopWidth : 1,
    marginLeft     : -16,
    marginRight    : -16,
    marginBottom   : 5
  },
  spacer : {
    width : 15
  },
  actionsContainer : {
    flex          : 1,
    alignItems    : 'flex-start',
    flexDirection : 'row',
  },
  button : {
    height : 25
  }
});

// Generic Form component
const Form = ({
  title,
  submit,
  submitLabel,
  submitDisabled,
  inputs,
  secondLinkLabel,
  secondLinkTo,
  notACard,
  hideTitle,
  style
}) => {
  const values = {};
  // Render inputs
  const form = inputs.map((input) =>
    <MKTextField
      tintColor={MKColor.Indigo}
      textInputStyle={{ color : 'rgba(0, 0, 0, 0.54)' }}
      placeholder={input.label}
      onChangeText={(text) => {
        values[input.id] = text;
      }}
      value={values[input.id]}
      key={input.id}
      required={input.required}
    />
  );

  // Second button such as a cancel button
  const secondLink = secondLinkLabel && secondLinkTo ?
    <MKButton
      onPress={() => Actions[secondLinkTo]()}
      shadowRadius={2}
      shadowOffset={{ width : 0, height : 2 }}
      shadowOpacity={0.7}
      shadowColor="black"
    >
      <Text
        pointerEvents="none"
        style={{
          color : MKColor.Red
        }}
      >
        {secondLinkLabel.toUpperCase()}
      </Text>
    </MKButton>
    : null;

  const titleComponent = hideTitle ? null :
    <Text
      style={styles.title}
    >
      {title}
    </Text>;

  const actions = (
    <View style={styles.actionsContainer}>
      <View style={styles.spacer} />
      {secondLink}
      <View style={styles.spacer} />
      <MKButton
        style={styles.button}
        onPress={() => {
          submit(values);
        }}
        disabled={!!submitDisabled}
      >
        <Text
          pointerEvents="none"
          style={{
            color : MKColor.Indigo
          }}
        >
          {submitLabel.toUpperCase()}
        </Text>
      </MKButton>
    </View>
  );
  const card = (
    <Card>
      {titleComponent}
      <Card.Body>
        {form}
      </Card.Body>
      <View style={styles.actions} />
      <Card.Actions
        position="left"
      >
        {actions}
      </Card.Actions>
    </Card>
  );

  const noCard = (
    <View>
      {titleComponent}
      {form}
      <View>
        {actions}
      </View>
    </View>
  );

  const computedForm = notACard ? noCard : card;

  // Render form
  return (
    <View style={style}>
      {computedForm}
    </View>
  );
};

/**
 * Generic form component
 * @param title  : form's title
 * @param submit : function called on submit
 * @param submitLabel : submit button label
 * @param submitDisabled : boolean to disable submit button
 * @param inputs : array of form fields
 * @param secondLinkLabel : secondary button label
 * @param secondLinkTo : secondary button "to" attribute
 * @param notACard : if set remove all card related styling
 * @param hideTitle : if set does not display form's title
 */
Form.propTypes = {
  submit          : React.PropTypes.func.isRequired,
  inputs          : React.PropTypes.array.isRequired,
  title           : React.PropTypes.string.isRequired,
  submitLabel     : React.PropTypes.string.isRequired,
  submitDisabled  : React.PropTypes.bool,
  secondLinkLabel : React.PropTypes.string,
  secondLinkTo    : React.PropTypes.string,
  notACard        : React.PropTypes.bool,
  hideTitle       : React.PropTypes.bool,
  style           : React.PropTypes.any
};

export default Form;
