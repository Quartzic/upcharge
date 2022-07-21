import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import { Alert } from "react-native";

const Menu = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'menu'}
          actions={[
            { icon: 'email', label: 'Email cart', onPress: props.emailCart  },
            { icon: 'share', label: 'Share cart', onPress: props.shareCart },
            { icon: 'delete', label: 'Empty cart', onPress: () => Alert.alert(
                "Are you sure?",
                null,
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Empty cart", onPress: () => props.clearCart() }
                ],
                { cancelable: false }

              ) },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
  );
};

export default Menu;
