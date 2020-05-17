import React from "react";

class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectNumber: "",
      originator: "",
      volume: "",
      level: "",
      doctype: "",
      discipline: "",
      description: "",
      timecreated: "",
      data: [
        {
          id: "",
          projectnumber: "",
          originator: "",
          volume: "",
          level: "",
          doctype: "",
          discipline: "",
          docnumber: "",
          docnumberstring: "",
          description: "",
          createdby: "",
          timecreated: "",
        },
      ],
    };
  }

  onProjectNumberChange = (event) => {
    this.setState({ projectNumber: event.target.value });
  };

  onOriginatorChange = (event) => {
    this.setState({ originator: event.target.value });
  };

  onVolumeChange = (event) => {
    this.setState({ volume: event.target.value });
  };

  onLevelChange = (event) => {
    this.setState({ level: event.target.value });
  };

  onDocTypeChange = (event) => {
    this.setState({ doctype: event.target.value });
  };

  onDisciplineChange = (event) => {
    this.setState({ discipline: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onSubmitNumber = () => {
    this.loadAllDocNumbers();
    var largestDocNumber = 0;
    var newDocNumber = 0;
    var newDocNumberString = "0001";
    var i = 0;
    for (i; i < this.state.data.length; i++) {
      if (
        (this.state.originator === this.state.data[i].originator) &
        (this.state.volume === this.state.data[i].volume) &
        (this.state.level === this.state.data[i].level) &
        (this.state.doctype === this.state.data[i].doctype) &
        (this.state.discipline === this.state.data[i].discipline)
      ) {
        largestDocNumber = this.state.data[i].docnumber;
      }
    }
    console.log("largest", largestDocNumber);
    newDocNumber = +largestDocNumber + 1;
    if (newDocNumber > 999) {
      newDocNumberString = newDocNumber;
    } else if (newDocNumber > 99) {
      newDocNumberString = "0" + newDocNumber;
    } else if (newDocNumber > 9) {
      newDocNumberString = "00" + newDocNumber;
    } else {
      newDocNumberString = "000" + newDocNumber;
    }
    console.log("newdocnumber string", newDocNumberString);
    console.log("new", newDocNumber);
    console.log("docnumber state before", this.state.docnumber);
    // the fetch piece of code must run as a callback after the setState occurs since setState is Asynchronous and sometime won't unpdate before running the next line.
    this.setState(
      { docnumber: newDocNumber, docnumberstring: newDocNumberString },
      () => {
        console.log("docnumber state after", this.state.docnumber);
        fetch("https://blooming-eyrie-16687.herokuapp.com/docnumbers", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectnumber: this.state.projectNumber,
            originator: this.state.originator,
            volume: this.state.volume,
            level: this.state.level,
            doctype: this.state.doctype,
            discipline: this.state.discipline,
            description: this.state.description,
            docnumber: this.state.docnumber,
            createdby: this.props.name,
            timecreated: this.state.timecreated,
            docnumberstring: this.state.docnumberstring,
          }),
        })
          .then((response) => response.json())
          .then((user) => this.props.onRouteChange("home"));
        alert(
          "The following document number was submitted successfully: " +
            this.state.projectNumber +
            "-" +
            this.state.originator +
            "-" +
            this.state.volume +
            "-" +
            this.state.level +
            "-" +
            this.state.doctype +
            "-" +
            this.state.discipline +
            "-" +
            this.state.docnumberstring +
            "-" +
            this.state.description
        );
        this.loadAllDocNumbers();
      }
    );
  };

  componentDidMount() {
    this.setState({
      projectNumber: "12345",
      originator: "CG",
      volume: "XX",
      level: "XX",
      doctype: "SK",
      discipline: "S",
      docnumber: 1,
    });
    this.loadAllDocNumbers();
  }

  loadAllDocNumbers = () => {
    fetch("https://blooming-eyrie-16687.herokuapp.com/docnumbers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data });

        // console.log("state", this.state);
        // console.log("state data 0", this.state.data[0].projectnumber);
        // console.log("state data 1", this.state.data[1]);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const projectnumber = this.state.data[0].projectnumber;
    var originator = this.state.originator;
    var i = 0;
    const items = [];
    if (this.state.data) {
      for (i; i < this.state.data.length; i++) {
        if (originator === this.state.data[i].originator) {
          items.push(
            <p>{`Doc number: ${this.state.data[i].projectnumber}-${this.state.data[i].originator}-${this.state.data[i].volume}-${this.state.data[i].level}-${this.state.data[i].doctype}-${this.state.data[i].discipline}-${this.state.data[i].docnumberstring}-${this.state.data[i].description} ////  Created by: ${this.state.data[i].createdby}   ////    Time created: ${this.state.data[i].timecreated}`}</p>
          );
        }
      }
    }

    return (
      <div>
        <div className="white f3">{`Welcome back, ${this.props.name}`}</div>
        <div className="white f3">
          {`To start a new document number fill out the dropdowns below.`}
        </div>
        <form onChange={this.onProjectNumberChange}>
          <p>
            <label>Project Number: </label>
            <select id="projectnumber" value={this.state.projectNumber}>
              <option value="12345">12345</option>
              <option value="99999">99999</option>
              <option value="22222">22222</option>
              <option value="11111">11111</option>
            </select>
          </p>
        </form>

        <form onChange={this.onOriginatorChange}>
          <p>
            <label>Originator: </label>
            <select id="originator">
              <option value="CG">CG</option>
              <option value="ZE">ZE</option>
              <option value="SR">SR</option>
              <option value="ML">ML</option>
              <option value="BB">BB</option>
            </select>
          </p>
        </form>
        <form onChange={this.onVolumeChange} onLoadStart={this.onVolumeChange}>
          <p>
            <label>Volume: </label>
            <select id="volume">
              <option value="XX">XX</option>
              <option value="ZZ">ZZ</option>
              <option value="01">01</option>
              <option value="02">02</option>
            </select>
          </p>
        </form>
        <form onChange={this.onLevelChange}>
          <p>
            <label>Level: </label>
            <select id="level">
              <option value="XX">XX</option>
              <option value="ZZ">ZZ</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>
          </p>
        </form>
        <form onChange={this.onDocTypeChange}>
          <p>
            <label>Doc type: </label>
            <select id="docType">
              <option value="SK">Sketch</option>
              <option value="DR">Drawing</option>
              <option value="RE">Report</option>
              <option value="LE">Letter</option>
            </select>
          </p>
        </form>
        <form onChange={this.onDisciplineChange}>
          <p>
            <label>Discipline: </label>
            <select id="discipline">
              <option value="S">Structural Engineer</option>
              <option value="C">Civil Engineer</option>
              <option value="A">Architect</option>
              <option value="E">Environmental</option>
              <option value="M">Mechanical</option>
              <option value="H">Hydraulic</option>
            </select>
          </p>
        </form>

        <form>
          <label>
            Description:
            <textarea
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </label>
        </form>

        <div className="white f2">
          <p>
            {this.state.projectNumber}-{this.state.originator}-
            {this.state.volume}-{this.state.level}-{this.state.doctype}-
            {this.state.discipline}-{this.state.docnumberstring} -{" "}
            {this.state.description}
          </p>
        </div>
        <input
          onClick={this.onSubmitNumber}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Commit to database"
        />
        <input
          onClick={this.loadAllDocNumbers}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="Update doc numbers"
        />

        {
          // projectnumber.length > 0 &&
          <div className="white f3">
            <p>{`Previous doc numbers`}</p>
            {items}
          </div>
        }
      </div>
    );
  }
}

export default Rank;
