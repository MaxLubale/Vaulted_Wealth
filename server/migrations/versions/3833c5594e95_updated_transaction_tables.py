"""updated transaction  tables

Revision ID: 3833c5594e95
Revises: 2120342e7a8d
Create Date: 2024-02-11 21:01:31.324051

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3833c5594e95'
down_revision = '2120342e7a8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('transaction_date', sa.DateTime(), nullable=True))
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DATETIME(), nullable=True))
        batch_op.drop_column('transaction_date')

    # ### end Alembic commands ###
