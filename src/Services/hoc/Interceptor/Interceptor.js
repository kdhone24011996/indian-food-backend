import React, { Component } from "react";
import Auxiliary from "../Auxiliary";
import { axios } from "../../API/Axios";
import Alert from "@mui/material/Alert";
const withErrorHandler = (WrappedComponent) => {
  return class extends Component {
    //here withErrorHandler returns an anonymus class which recieves the props of the wrappedComponent.
    state = {
      error: null,
      open: true,
      success: null,
      // submit: false,
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((request) => {
        if (request.data && request.data.submit) {
          this.setState({ error: null, submit: true });
          delete request.data.submit;
        }
        this.setState({ error: null });
        return request;
      });
      this.responseInterceptors = axios.interceptors.response.use(
        async (response) => {
          if (
            this.state.submit &&
            (response.config.method === "post" ||
              response.config.method === "patch" ||
              response.config.method === "put")
          ) {
            this.setState({
              success: "Successfully Submited",
              open: true,
              error: null,
            });
            const timeOut = () => {
              return new Promise((resolve) =>
                setTimeout(() => {
                  this.setState({ open: false });
                  resolve(response);
                }, 2000)
              );
            };
            await timeOut();
            this.setState({ submit: false, error: null });
            return response;
          } else {
            return response;
          }
        },

        (error) => {
          this.setState({
            error: error.response.data.errors,
            open: true,
            success: null,
          });
          setTimeout(() => this.setState({ open: false }), 5000);
          throw new Error(error);
          // return error;
        }
      );
    }
    errorHandler = () => {
      this.setState({ error: null });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.responseInterceptors);
    }

    onCloseHandler = () => {
      this.setState({ open: false });
    };
    render() {
      return (
        <Auxiliary open>
          {/* <Modal show={!!this.state.error} onHide={this.errorHandler}>
            <Modal.Header closeButton className="bg-danger text-white">
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pb-5 pt-4  h5" style={{ color: "#b52d2d" }}>
              {this.state.error ? this.state.error : null}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="light"
                className="border border-secondary"
                onClick={this.errorHandler}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}
          {!!this.state.error && this.state.open && (
            <Alert
              onClose={this.onCloseHandler}
              variant="filled"
              severity="error"
              style={{
                position: "fixed",
                top: "5px",
                right: "5px",
                zIndex: "10000",
                background: "red",
                textTransform: "capitalize",
              }}
            >
              {this.state.error.map((val) => {
                return (
                  <span>
                    {val} <br />
                  </span>
                );
              })}
            </Alert>
          )}
          {!!this.state.success && this.state.open && (
            <Alert
              onClose={this.onCloseHandler}
              variant="filled"
              severity="success"
              style={{
                position: "fixed",
                top: "5px",
                right: "5px",
                zIndex: "10000",
                background: "green",
                textTransform: "capitalize",
              }}
            >
              <span>{this.state.success} </span>
            </Alert>
          )}
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};
export default withErrorHandler;
