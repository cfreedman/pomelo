from flask import Blueprint, flash, g, redirect, request, url_for, session
import functools

from app.database import get_db


bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/register", methods=("GET", "POST"))
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        db = get_db()
        error = None

        if not username:
            error = "Username is required."
        if not password:
            error = "Password is required."

        if not error:
            try:
                # Try insertion into DB here
                pass
            except db.IntegrityError:  # Database error for user already existing
                error = f"User {username} is already registered."
            else:
                return redirect(url_for("auth.login"))

        flash(error)


@bp.route("/login", methods=("GET", "POST"))
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        db = get_db()
        error = None

        # Try to find user in database here
        user = None

        if not user:
            error = "Incorrect username."
        # Check for valid password for username here

        if not error:
            session.clear()
            session["user_id"] = username  # change to database user id later
            return redirect(url_for("index"))

        flash(error)


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get("user_id")

    if not user_id:
        g.user = None
    else:
        # Database fetch for user id
        pass


def login_required(view):
    @functools.wraps(view)
    def check_valid_view(**kwargs):
        if not g.user:
            return redirect(url_for("auth.login"))

        return view(**kwargs)

    return check_valid_view
