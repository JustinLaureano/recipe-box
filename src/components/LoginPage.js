import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <div className="container__page">
    <div className="login">
      <div className="login__hero">
          <h1>RecipeBox</h1>
          <h2>Your Personal Recipe Collection in one place</h2>
          <button className="login__loginBtn" onClick={startLogin}>Get Started</button>
      </div>
      <section className="login__caption">
          <h3>The Go-to Recipe Organizer for Home Cooks and Chefs Alike</h3>
          <p className="login__captionText">
              Short loin porchetta beef ribs prosciutto. Cupim andouille pig turkey
              jowl pork chop alcatra filet mignon. Bresaola landjaeger andouille 
              pork belly salami tri-tip. Sirloin kielbasa short loin bacon bits.
          </p>
      </section>
      <section className="login__features">
          <aside className="login__features--feature">
              <h4>Organize Your Way</h4>
              <p>
                  Filet mignon spare ribs swine andouille. Shankle rump buffalo drumstick,
                  salami kevin tenderloin tail ham hock pancetta biltong.
              </p>
              <button className="login__featuresBtn">Check It Out</button>
          </aside>
          <aside className="login__features--feature">
              <h4>Add New Recipes Easily</h4>
              <p>
                  Turducken strip steak jowl jerky, sausage andouille fatback shoulder drumstick ribeye
                  filet mignon alcatra. Short ribs salami venison chuck, pastrami drumstick doner.
              </p>
              <button className="login__featuresBtn">Check It Out</button>
          </aside>
      </section>
    </div>
</div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
