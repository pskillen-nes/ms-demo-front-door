import React, {useCallback, useEffect, useRef, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import Webcam from "react-webcam";
import QRCode from "react-qr-code";
import {TurasSection} from "@nes-digital-service/turas.design-system-react/dist/components/layout/TurasSection";
import {FormGroup, TurasForm} from "@nes-digital-service/turas.design-system-react/dist/components/forms/Forms";
import {ConfirmActionModal} from "@nes-digital-service/turas.design-system-react/dist/modals/ConfirmModals";

import SiteBaseScreen from "./SiteBaseScreen";
import {useLocalStorage} from "usehooks-ts";
import {ServerConfig} from "../siteConfig";


type WebcamPanelProps = {
  onImageCaptured?: (imageBase64: string) => void;
};

function WebcamPanel(props: WebcamPanelProps): React.ReactElement {
  const LS_WEBCAM_DEVICE_ID = "webcam-device-id";

  const [webcamDevices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedWebcamDeviceId, setSelectedWebcamDeviceId] = useLocalStorage<string | undefined>(LS_WEBCAM_DEVICE_ID, undefined);
  const [capturedWebcamImg, setCapturedWebcamImg] = useState<string | null>(null);

  const webcamRef = useRef<any>(null);


  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedWebcamImg(imageSrc);
  }, [webcamRef, setCapturedWebcamImg]);

  const handleWebcamDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    const devices = mediaDevices.filter(({kind}) => kind === "videoinput");

    if (devices) {
      if (!selectedWebcamDeviceId)
        setSelectedWebcamDeviceId(devices[0].deviceId)
    }

    setDevices(devices);
  }, [setDevices]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleWebcamDevices);
  }, [handleWebcamDevices]);

  return <>
    <TurasForm>

      {selectedWebcamDeviceId && <>
        <Webcam
          className="col-sm-12"
          audio={false}
          videoConstraints={{
            deviceId: selectedWebcamDeviceId,
          }}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

      </>}

      {webcamDevices && webcamDevices.length > 0 && <>
        <FormGroup className="mb-3">
          <Form.Select
            className="form-control select mb-2"
            required={true}
            onInput={(e) => setSelectedWebcamDeviceId(e.currentTarget.value)}
            value={selectedWebcamDeviceId}
          >

            {webcamDevices.map(d => <option value={d.deviceId}>{d.label || d.deviceId}</option>)}
          </Form.Select>

          <Button variant="primary"
                  className="col-sm-12 col-md-12 col-lg-12"
                  onClick={captureImage}>Capture photo
          </Button>
        </FormGroup>

      </>}

    </TurasForm>

    {capturedWebcamImg && <ConfirmActionModal
      title="Use this image?"
      message={
        <img src={capturedWebcamImg}/>
      }
      yesButtonText="Save"
      noButtonText="Discard"
      closeButton={true}
      onYesButtonClick={() => {
        props.onImageCaptured && props.onImageCaptured(capturedWebcamImg!);
        setCapturedWebcamImg(null);
      }}
      onNoButtonClick={() => {
        setCapturedWebcamImg(null);
      }}
      onHide={() => {
        setCapturedWebcamImg(null);
      }}
    />}
  </>;
}


type PatientDetailsPanelProps = {
  name: {
    family: string;
    given: string;
  };
  dob: string;
  chi: string;
  address: {
    line: string[];
    city: string;
    postcode: string;
  }
}

function PatientDetailsPanel(props: PatientDetailsPanelProps): React.ReactElement {

  const name = props.name.family.toUpperCase() + ', ' + props.name.given;

  const address = [
    ...props.address.line,
    props.address.city,
    props.address.postcode,
  ]

  return <>
    <h2>Patient</h2>
    <dl className="row">
      <dt className="col-sm-3">Name</dt>
      <dd className="col-sm-9">{name}</dd>
      <dt className="col-sm-3">DoB</dt>
      <dd className="col-sm-9">{props.dob}</dd>
      <dt className="col-sm-3">CHI</dt>
      <dd className="col-sm-9">{props.chi}</dd>
      <dt className="col-sm-3">Address</dt>
      <dd className="col-sm-9">{address.join(', ')}</dd>
    </dl>
  </>
}

export function GPImageCaptureLanding(): React.ReactElement {

  const [noteText, setNoteText] = useState<string>("");
  const [chi, setChi] = useState<string>("9912312312");

  return <SiteBaseScreen pageTitle="GP Image Capture"
                         pageSubtitle="Use this form to capture images during an appointment. They will be saved for later use (e.g. for a referral)."
                         sideNav="off"
  >
    <TurasSection>

      <Row className="justify-content-center">

        <Col md={12} className="mb-30">
          <PatientDetailsPanel chi={chi}
                               name={{given: 'Gordon', family: 'Freeman'}}
                               address={{
                                 line: ['123 Fake St', 'Fakesville'],
                                 city: 'Fakerton',
                                 postcode: 'FK123FK'
                               }}
                               dob="01 Jan 2000"
          />
        </Col>

        <Col md={12} className="mb-30">
          <TurasForm>
            <FormGroup>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea"
                            value={noteText}
                            onChange={e => setNoteText(e.currentTarget.value)}/>
            </FormGroup>
          </TurasForm>
        </Col>

        {/*
        <Col md={6} className="mb-30">
          <h2>Referral</h2>
          <dl className="row">
            <dt className="col-sm-3">To speciality</dt>
            <dd className="col-sm-9">Dermatology</dd>
            <dt className="col-sm-3">Reason</dt>
            <dd className="col-sm-9">Suspicion of basal cell carcinoma</dd>
            <dt className="col-sm-3">Centre</dt>
            <dd className="col-sm-9">Glasgow Royal Infirmary</dd>
            <dt className="col-sm-3">Clinic</dt>
            <dd className="col-sm-9">Dr Evil's morning derm clinc</dd>
          </dl>
        </Col>*/}

        <Col sm={12} md={12} lg={12}>
          {noteText.length !== 0 &&
            <Link className="btn btn-primary"
                  to={{
                    pathname: "/gp-image-capture/choose-upload",
                    search: `note=${encodeURIComponent(noteText)}&chi=${chi}`,
                  }}
            >Next Step</Link>}
          {noteText.length === 0 &&
            <Button variant="primary"
                    disabled={true}
            >Next step</Button>}

        </Col>

      </Row>

    </TurasSection>
  </SiteBaseScreen>;
}

export function GPImageCaptureChooseUpload(): React.ReactElement {
  const [qrValue, setQrValue] = useState<string>('');
  const [chi, setChi] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get querystring value
    const chi = searchParams.get("chi") || "error";
    const note = searchParams.get("note") || "error";

    setChi(chi);
    setNoteText(note);

    const serverHost = `https://${ServerConfig.host}:${ServerConfig.port}`;
    const qrUrl = new URL("/#/gp-image-capture/upload", serverHost);
    qrUrl.searchParams.set("chi", chi);
    qrUrl.searchParams.set("note", note);
    setQrValue(qrUrl.href);
  }, []);

  return <SiteBaseScreen pageTitle="GP Image Capture"
                         pageSubtitle="Use this form to capture images during an appointment. They will be saved for later use (e.g. for a referral)."
                         sideNav="off"
  >

    <TurasSection>

      <Row className="justify-content-center">

        <Col md={12} className="mb-30">
          <PatientDetailsPanel chi={chi}
                               name={{given: 'Gordon', family: 'Freeman'}}
                               address={{
                                 line: ['123 Fake St', 'Fakesville'],
                                 city: 'Fakerton',
                                 postcode: 'FK123FK'
                               }}
                               dob="01 Jan 2000"
          />
        </Col>

        <Col md={12} className="mb-30">
          <h2>Notes</h2>
          <div>{noteText}</div>
        </Col>

        <Col lg={4} md={4} className="d-none d-md-block">
          <h2>Upload from computer</h2>
          <Link className="btn btn-primary"
                to={{
                  pathname: "/gp-image-capture/upload",
                  search: `note=${encodeURIComponent(noteText)}&chi=${chi}`,
                }}
          >Capture/upload from computer</Link>
        </Col>

        <Col lg={4} md={4} className="d-none d-md-block">
          <h2>Open on phone</h2>
          <QRCode value={qrValue}/>
          <p>Scan this image with your phone's QR code scanner</p>
        </Col>

        <Col lg={4} md={4} className="d-none d-md-block">
          <h2>Request from patient</h2>
          <Link className="btn btn-primary"
                to={{
                  pathname: "/gp-image-capture/patient-request",
                  search: `note=${encodeURIComponent(noteText)}&chi=${chi}`,
                }}
          >Send link to patient</Link>
        </Col>

        <Col xs={12} sm={12} md={12} className="d-md-none">
          <Link className="btn btn-primary"
                to={{
                  pathname: "/gp-image-capture/upload",
                  search: `note=${encodeURIComponent(noteText)}&chi=${chi}`,
                }}
          >Start capturing images</Link>
          <Link className="btn btn-primary"
                to={{
                  pathname: "/gp-image-capture/patient-request",
                  search: `note=${encodeURIComponent(noteText)}&chi=${chi}`,
                }}
          >Send link to patient</Link>
        </Col>

      </Row>

    </TurasSection>
  </SiteBaseScreen>;
}

export function GPImageCaptureUpload(): React.ReactElement {

  const [images, setImages] = useState<string[]>([]);
  const [chi, setChi] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get querystring value
    const chi = searchParams.get("chi") || "error";
    const note = searchParams.get("note") || "error";

    setChi(chi);
    setNoteText(note);
  }, []);

  function handleImageCaptured(imgBase64: string) {
    const imgs = [
      ...images,
      imgBase64
    ];
    setImages(imgs);
  }

  return <SiteBaseScreen pageTitle="GP Referral"
                         pageSubtitle="Use this form to capture images during an appointment. The will be saved for later use."
                         sideNav="off"
  >
    <TurasSection>

      <Row className="justify-content-center">

        <Col md={12} className="mb-30">
          <PatientDetailsPanel chi={chi}
                               name={{given: 'Gordon', family: 'Freeman'}}
                               address={{
                                 line: ['123 Fake St', 'Fakesville'],
                                 city: 'Fakerton',
                                 postcode: 'FK123FK'
                               }}
                               dob="01 Jan 2000"
          />
        </Col>

        <Col md={12} className="mb-30">
          <h2>Notes</h2>
          <div>{noteText}</div>
        </Col>

        <Col lg={6} md={12} sm={12} className="mb-30">
          <h2>Capture image</h2>

          <WebcamPanel onImageCaptured={handleImageCaptured}/>
        </Col>

        <Col lg={6} md={12} sm={12} className="mb-30">
          <h2>Files</h2>

          <Row>
            {images.map((imgBase64, n) => <>
              <Col sm={6} md={4} lg={4}>
                <img src={imgBase64} className="img-thumbnail"/>
              </Col>
            </>)}
          </Row>

          <Button variant="primary"
                  className="col-sm-12 col-md-12 col-lg-12"
                  disabled={images.length === 0}
          >Save these images
          </Button>

        </Col>

      </Row>

    </TurasSection>
  </SiteBaseScreen>;

}

export function GPImageSendPatientRequest(): React.ReactElement {
  const [chi, setChi] = useState<string>("");
  const [gpNoteText, setGpNoteText] = useState<string>("");
  const [patientNoteText, setPatientNoteText] = useState<string>("");
  const [patientEmailAddress, setPatientEmailAddress] = useState<string>("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get querystring value
    const chi = searchParams.get("chi") || "error";
    const note = searchParams.get("note") || "error";

    setChi(chi);
    setGpNoteText(note);
  }, []);

  return <SiteBaseScreen pageTitle="GP Image Capture"
                         pageSubtitle="Use this form to capture images during an appointment. They will be saved for later use (e.g. for a referral)."
                         sideNav="off"
  >

    <TurasSection>
      <TurasForm>

        <Row className="justify-content-end">

          <Col md={12} className="mb-30">
            <PatientDetailsPanel chi={chi}
                                 name={{given: 'Gordon', family: 'Freeman'}}
                                 address={{
                                   line: ['123 Fake St', 'Fakesville'],
                                   city: 'Fakerton',
                                   postcode: 'FK123FK'
                                 }}
                                 dob="01 Jan 2000"
            />
          </Col>

          <Col md={12} className="mb-30">
            <h2>Notes</h2>
            <FormGroup>
              <Form.Label>GP note</Form.Label>
              <p className="text-muted">These will be hidden from the patient</p>
              <Form.Control as="textarea"
                            value={gpNoteText}
                            disabled={true}/>
            </FormGroup>

            <FormGroup>
              <Form.Label>Patient note</Form.Label>
              <p className="text-muted">These will be sent to the patient as part of the image request</p>
              <Form.Control as="textarea"
                            value={patientNoteText}
                            onChange={e => setPatientNoteText(e.currentTarget.value)}/>
            </FormGroup>

          </Col>
        </Row>

        <Row className="justify-content-start">
          <Col sm={12}>
            <h2>Request from patient</h2>
          </Col>

          <Col lg={4} md={4}>
            <FormGroup>
              <Form.Label>Patient email address</Form.Label>
              <Form.Control as="input"
                            value={patientEmailAddress}
                            onChange={e => setPatientEmailAddress(e.currentTarget.value)}/>
            </FormGroup>
          </Col>

          <Col lg={4} md={4}>
            <FormGroup>
              <Form.Label>Send request</Form.Label>
              <div>
                <Link className="btn btn-primary"
                      to={{
                        pathname: "/gp-image-capture/patient-request/email",
                        search: `
name=${encodeURIComponent('Gordon Freeman')}
&email=${encodeURIComponent(patientEmailAddress)}
&note=${encodeURIComponent(patientNoteText)}
&chi=${encodeURIComponent(chi)}`,
                      }}
                >Send link to patient</Link>
              </div>
            </FormGroup>
          </Col>

        </Row>

      </TurasForm>

    </TurasSection>
  </SiteBaseScreen>;
}

export function GPImageSendPatientRequestEmail(): React.ReactElement {
  const [chi, setChi] = useState<string>("");
  const [patientNoteText, setPatientNoteText] = useState<string>("");
  const [patientEmailAddress, setPatientEmailAddress] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");

  const [qrValue, setQrValue] = useState<string>('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // get querystring value
    const chi = searchParams.get("chi") || "error";
    const patientEmailAddress = searchParams.get("email") || "error";
    const patientName = searchParams.get("name") || "error";
    const patientNoteText = searchParams.get("note") || "error";

    const serverHost = `https://${ServerConfig.host}:${ServerConfig.port}`;
    const qrUrl = new URL("/#/gp-image-capture/patient-upload", serverHost);
    qrUrl.searchParams.set("chi", chi);
    qrUrl.searchParams.set("note", patientNoteText);
    setQrValue(qrUrl.href);

    setChi(chi);
    setPatientName(patientName);
    setPatientEmailAddress(patientEmailAddress);
    setPatientNoteText(patientNoteText);
  }, []);

  return <SiteBaseScreen pageTitle="Example patient email"
                         pageSubtitle={`This email would be sent to ${patientEmailAddress} in response to a request by a GP`}
  >
    <TurasSection>
      <h2>Dear {patientName}</h2>

      <p>You have received the following request from your GP.</p>

      <p><strong>{patientNoteText}</strong></p>

      <p>You can open this link on your phone or on your computer</p>

      <div className="d-none d-md-block">
        <Row>
          <Col lg={4} md={6}>
            <h2>Open on this device</h2>
            <Link className="btn btn-primary"
                  to={{
                    pathname: "/gp-image-capture/patient-upload",
                    search: `
name=${encodeURIComponent('Gordon Freeman')}
&email=${encodeURIComponent(patientEmailAddress)}
&note=${encodeURIComponent(patientNoteText)}
&chi=${encodeURIComponent(chi)}`,
                  }}
            >Start capturing images</Link>
          </Col>

          <Col lg={4} md={6}>
            <h2>Open on phone</h2>
            <QRCode value={qrValue}/>
            <p>Scan this image with your phone's QR code scanner</p>
          </Col>
        </Row>
      </div>

      <div className="d-md-none">
        <Link className="btn btn-primary"
              to={{
                pathname: "/gp-image-capture/patient-upload",
                search: `
name=${encodeURIComponent('Gordon Freeman')}
&email=${encodeURIComponent(patientEmailAddress)}
&note=${encodeURIComponent(patientNoteText)}
&chi=${encodeURIComponent(chi)}`,
              }}
        >Start capturing images</Link>
      </div>

    </TurasSection>
  </SiteBaseScreen>
}

export function GPImageSendPatientRequestPatientUpload(): React.ReactElement {
  const [chi, setChi] = useState<string>("");
  const [patientNoteText, setPatientNoteText] = useState<string>("");
  const [patientEmailAddress, setPatientEmailAddress] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);

  const [searchParams] = useSearchParams();

  function handleImageCaptured(imgBase64: string) {
    const imgs = [
      ...images,
      imgBase64
    ];
    setImages(imgs);
  }

  useEffect(() => {
    // get querystring value
    const chi = searchParams.get("chi") || "error";
    const patientEmailAddress = searchParams.get("email") || "error";
    const patientName = searchParams.get("name") || "error";
    const patientNoteText = searchParams.get("note") || "error";

    setChi(chi);
    setPatientName(patientName);
    setPatientEmailAddress(patientEmailAddress);
    setPatientNoteText(patientNoteText);
  }, []);

  return <SiteBaseScreen pageTitle="GP Image Request"
                         pageSubtitle="Your GP has requested that you supply images for use in an ongoing referral or investigation"
                         sideNav="off"
  >
    <TurasSection>

      <Row className="justify-content-center">

        <Col md={12} className="mb-30">
          <PatientDetailsPanel chi={chi}
                               name={{given: 'Gordon', family: 'Freeman'}}
                               address={{
                                 line: ['123 Fake St', 'Fakesville'],
                                 city: 'Fakerton',
                                 postcode: 'FK123FK'
                               }}
                               dob="01 Jan 2000"
          />
        </Col>

        <Col md={12} className="mb-30">
          <h2>Notes</h2>
          <div>{patientNoteText}</div>
        </Col>

        <Col lg={6} md={12} sm={12} className="mb-30">
          <h2>Capture image</h2>

          <WebcamPanel onImageCaptured={handleImageCaptured}/>
        </Col>

        <Col lg={6} md={12} sm={12} className="mb-30">
          <h2>Files</h2>

          <Row>
            {images.map((imgBase64, n) => <>
              <Col sm={6} md={4} lg={4}>
                <img src={imgBase64} className="img-thumbnail"/>
              </Col>
            </>)}
          </Row>

          <Button variant="primary"
                  className="col-sm-12 col-md-12 col-lg-12"
                  disabled={images.length === 0}
          >Save these images
          </Button>

        </Col>

      </Row>
    </TurasSection>
  </SiteBaseScreen>
}
