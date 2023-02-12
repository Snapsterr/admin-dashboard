import { Col, Nav, Row, Tab } from "react-bootstrap"
import styled from "styled-components"
import DashboardSection from "./DashboardSection"

const MainWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 104px);
  padding: 0px 25px;
`

const CustomCol = styled(Col)`
  border-right: 1px solid #dadada;
  @media (max-width: 650px) {
    padding-left: 0px;
  }
  @media (max-width: 575px) {
    padding-left: 0.75rem;
    border-right: none !important;
    margin-bottom: 30px;
  }
`

const DashboardContent = () => {
  return (
    <main className="mt-4">
      <MainWrapper>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <CustomCol
              sm={3}
              md={3}
              lg={2}
              className="overflow-auto p-md-0"
              style={{ borderRight: "1px solid #dadada" }}
            >
              <Nav variant="pills" className="flex-column overflow-hidden">
                <Nav.Item>
                  <Nav.Link eventKey="first" defaultChecked>
                    Transactions
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </CustomCol>
            <Col sm={9} md={9} lg={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <DashboardSection />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </MainWrapper>
    </main>
  )
}

export default DashboardContent
